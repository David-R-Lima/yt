import { Injectable } from "@nestjs/common";
import { ISongRepository } from "src/domain/repositories/i-song-repository";
import { PrismaService } from "../prisma.service";
import { Song } from "src/domain/entities/songs";
import { IPagination } from "src/core/pagination";
import { PrismaSongMapper } from "../mappers/prisma-song-mapper";

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

    async getAll(paganiation: IPagination): Promise<Song[]> {
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
            skip: (p - 1) * l
        });

        return raws.map(PrismaSongMapper.toDomain);
    }

    async update(id: string, song: Song): Promise<void> {
        const data = PrismaSongMapper.toPrisma(song);

        await this.prisma.songs.update({
            where: { id },
            data,
        });
    }
}