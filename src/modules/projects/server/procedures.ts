import { z } from "zod";
import { generateSlug } from "random-word-slugs";

import { prisma } from "@/lib/db";
import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
    getOne: protectProcedure
        .input(z.object({
            id: z.string().min(1, { message: "Id is required"}),
        }))
        .query(async ({ input, ctx }) => {
            const existingProject = await prisma.project.findUnique({
                where: {
                    id: input.id,
                    userId: ctx.auth.userId,
                }
            });
            if(!existingProject){
                throw new TRPCError({code: "NOT_FOUND", message: "Project not found"});
            }
            return existingProject
        }),
    
    getMany: protectProcedure
        .query(async ({ ctx }) => {
            const projects = await prisma.project.findMany({
                where:{
                    userId: ctx.auth.userId,
                },
                orderBy: {
                    updateAt: "asc",
                },
            });
            return projects
        }),
        create: protectProcedure
            .input(
                z.object({
                    value: z.string()
                    .min(1, { message: "Prompt is too long" })
                    .max(1000, { message: "Prompt is too long"})
                }),
        )
        .mutation(async ({ input, ctx }) => {
            const createProject = await prisma.project.create({
            data :{
                userId: ctx.auth.userId,
                name: generateSlug(2, {
                    format: "kebab"
                }),
                messages:{
                    create:{
                        content: input.value,
                        role: "USER",
                        type: "RESULT"
                    }
                }
            }
            })
            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                    projectId: createProject.id,
                }
            });
            return createProject
        }),
    });
