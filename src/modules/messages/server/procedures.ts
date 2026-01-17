import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { createTRPCRouter, protectProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod"

export const messagesRouter = createTRPCRouter({
    getMany: protectProcedure
        .input(
            z.object({
                projectId: z.string().min(1, { message : "Project ID is required"}),
            })
        )

        .query(async ({ input, ctx }) => {
            const messages = await prisma.message.findMany({
                where:{
                    projectId: input.projectId,
                    project:{
                        userId: ctx.auth.userId,
                    }
                },
                include:{
                    fragment: true
                },
                orderBy:{
                    updateAt: "asc",
                },
                
            });
            return messages;
        }),
    create: protectProcedure
       .input(
        z.object({
           value: z.string()
           .min(1, { message: "Prompt is too long" })
           .max(1000, { message: "Prompt is too long"}),
           projectId: z.string().min(1, { message: "Project ID is required" }),
        }),
       )
       .mutation(async ({ input, ctx })=>{
        const existinProject = await prisma.project.findUnique({
            where:{
                id: input.projectId,
                userId: ctx.auth.userId,
            },
        });

        if(!existinProject){
            throw new TRPCError({ code: "NOT_FOUND", message: "Project not found"});
        }
       const createdMessage = await prisma.message.create({
            data: {
              projectId: existinProject.id,
              content: input.value,
              role: "USER",
              type: "RESULT",
            }
        });
        await inngest.send({
            name: "code-agent/run",
            data: {
                value: input.value,
                projectId: input.projectId,
            }
        });
        return createdMessage;
        
        }),
});