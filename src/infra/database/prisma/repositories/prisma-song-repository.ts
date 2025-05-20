import { Injectable } from "@nestjs/common";
import { GetAllSongsFilters, ISongRepository } from "src/domain/repositories/i-song-repository";
import { PrismaService } from "../prisma.service";
import { Song } from "src/domain/entities/songs";
import { IPagination, IPaginationResponse } from "src/core/pagination";
import { PrismaSongMapper } from "../mappers/prisma-song-mapper";
import { Liked } from "src/core/liked";

@Injectable()
export class PrismaSongRepository implements ISongRepository {
    constructor(private readonly prisma: PrismaService){}

    async create(song: Song): Promise<Song> {
        const data = PrismaSongMapper.toPrisma(song);

        await this.prisma.songs.create({
            data,
        });

        return song
    }

    async delete(id: string): Promise<void> {

    }

    async get(id: string): Promise<Song> {
        const raw = await this.prisma.songs.findUnique({
            where: { id },
        });

        if(!raw) throw new Error("Not found");

        return PrismaSongMapper.toDomain(raw);
    }

    async getAll(paganiation: IPagination, filters?: GetAllSongsFilters): Promise<{
        songs: Song[],
        paginationsReponse: IPaginationResponse
    }> {
        console.log(filters)
        const { limit, page } = paganiation;

        let p = 1
        let l = 10

        if(limit){
            l = limit
        }

        if(page){
            p = page
        }

        const raws = await this.prisma.songs.findMany({
            take: limit,
            skip: (p - 1) * l,
            where: {
                ...(filters?.text && {
                    OR: [
                        {
                            title: {
                                contains: filters.text,
                                mode: "insensitive"
                            }
                        },
                        {
                            artist: {
                                contains: filters.text,
                                mode: "insensitive"
                            }
                        },
                    ]
                }),
                // ...(filters?.liked && (
                //     {
                //         liked: false
                //     }
                // ))
            },
            orderBy: {
                createdAt: filters?.orderBy ?? "asc"
            }
        });

        const count = await this.prisma.songs.count();

        return {
            songs: raws.map(PrismaSongMapper.toDomain),
            paginationsReponse: {
                page: p,
                items: raws.length,
                totalItems: count
            }
        }
    }

    async update(id: string, song: Song): Promise<void> {
        const data = PrismaSongMapper.toPrisma(song);

        await this.prisma.songs.update({
            where: { id },
            data,
        });
    }
}