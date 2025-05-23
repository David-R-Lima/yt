import { Injectable } from "@nestjs/common";
import { GetAllSongsFilters, GetSongsOptions, ISongRepository } from "src/domain/repositories/i-song-repository";
import { PrismaService } from "../prisma.service";
import { Song } from "src/domain/entities/songs";
import { IPagination, IPaginationResponse } from "src/core/pagination";
import { PrismaSongMapper } from "../mappers/prisma-song-mapper";
import { Liked } from "src/core/liked";
import { Prisma, Songs as PrismaSongs } from "generated/prisma";
import { Random } from "src/core/random";
import { Reverse } from "src/core/reverse";

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
        const { limit, page } = paganiation;

        let p = 1
        let l = 10

        if(limit){
            l = limit
        }

        if(page){
            p = page
        }

        const where: Prisma.SongsWhereInput = {
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
            ...(filters?.duration && (
                {
                    duration: {
                        ...(filters.duration?.gte !== undefined && { gte: filters.duration.gte }),
                        ...(filters.duration?.lte !== undefined && { lte: filters.duration.lte }),
                    }
                }
            )),
            ...(filters?.liked && (
                {
                    liked: filters.liked === Liked.TRUE ? true : false
                }
            ))
        }

        const orderBy: Prisma.SongsOrderByWithAggregationInput = {
            createdAt: filters?.orderBy ?? "asc"
        }

        const raws = await this.prisma.songs.findMany({
            take: limit,
            skip: (p - 1) * l,
            where,
            orderBy
        });

        const count = await this.prisma.songs.count({
            where,
            orderBy
        });

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

    async getFromAll({ getSongOptions }: { getSongOptions: GetSongsOptions; }): Promise<Song[]> {
        const { startId, excludedIds = [], random = false, reverse = false } = getSongOptions;

        const baseConditions: Prisma.Sql[] = [];

        const fetchSongs = async (extraCondition?: Prisma.Sql[], backwards?: Reverse) => {
            const conditions = [...baseConditions];

            extraCondition?.forEach((condition) => conditions.push(condition))

            if (excludedIds.length > 0) {
                conditions.push(Prisma.sql`id NOT IN (${Prisma.join(excludedIds)})`);
            }

            const whereClause = conditions.length
            ? Prisma.sql`WHERE ${Prisma.join(conditions, ` AND `)}`
            : Prisma.sql``;

            let orderBy: Prisma.Sql;

            if (random === Random.TRUE) {
                orderBy = Prisma.sql`ORDER BY RANDOM()`;
            } else if (backwards === Reverse.TRUE) {
                orderBy = Prisma.sql`ORDER BY "id" DESC`;
            } else {
                orderBy = Prisma.sql`ORDER BY "id" ASC`;
            }
            
            const sql = Prisma.sql`
                SELECT * FROM "Songs"
                ${whereClause}
                ${orderBy}
                LIMIT 5
            `;

            const res = await this.prisma.$queryRaw<PrismaSongs[]> (sql);

            return res
        }

        let songs: PrismaSongs[]

        if(startId && reverse === Reverse.TRUE) {
            songs =  await fetchSongs([Prisma.sql`"Songs"."id" < ${startId}`])

            if(songs.length === 0) {
                songs =  (await fetchSongs([Prisma.sql`"Songs"."id" > ${startId}`], Reverse.TRUE)).reverse()
            }
        } else if(startId && reverse === Reverse.FALSE) {
            songs = await fetchSongs([Prisma.sql`"Songs"."id" > ${startId}`])

            if (songs.length === 0) {
                songs = await fetchSongs();
            }
        } else {
            songs = await fetchSongs()
        }

        return songs.map(PrismaSongMapper.toDomain)
    }

    async getFromLiked({ getSongOptions }: { getSongOptions: GetSongsOptions; }): Promise<Song[]> {
        const { startId, excludedIds = [], random = false, reverse = false } = getSongOptions;

        const baseConditions: Prisma.Sql[] = [Prisma.sql`liked = true`];

        const fetchSongs = async (extraCondition?: Prisma.Sql[], backwards?: Reverse) => {
            const conditions = [...baseConditions];

            extraCondition?.forEach((condition) => conditions.push(condition));

            if (excludedIds.length > 0) {
                conditions.push(Prisma.sql`id NOT IN (${Prisma.join(excludedIds)})`);
            }

            const whereClause = conditions.length
            ? Prisma.sql`WHERE ${Prisma.join(conditions, ` AND `)}`
            : Prisma.sql``;

            let orderBy: Prisma.Sql;

            if (random === Random.TRUE) {
                orderBy = Prisma.sql`ORDER BY RANDOM()`;
            } else if (backwards === Reverse.TRUE) {
                orderBy = Prisma.sql`ORDER BY "id" DESC`;
            } else {
                orderBy = Prisma.sql`ORDER BY "id" ASC`;
            }
            
            
            const sql = Prisma.sql`
                SELECT * FROM "Songs"
                ${whereClause}
                ${orderBy}
                LIMIT 5
            `;

            const res = await this.prisma.$queryRaw<PrismaSongs[]> (sql);

            return res
        }

        let songs: PrismaSongs[]

        if(startId && reverse === Reverse.TRUE) {
            songs =  await fetchSongs([Prisma.sql`"Songs"."id" < ${startId}`])

            if(songs.length === 0) {
                songs =  (await fetchSongs([Prisma.sql`"Songs"."id" > ${startId}`], Reverse.TRUE)).reverse()
            }
        } else if(startId && reverse === Reverse.FALSE) {
            songs = await fetchSongs([Prisma.sql`"Songs"."id" > ${startId}`])

            if (songs.length === 0) {
                songs = await fetchSongs();
            }
        } else {
            songs = await fetchSongs()
        }

        return songs.map(PrismaSongMapper.toDomain)
    }

    async getFromPlaylist({ playlistId, getSongOptions }: { playlistId: string; getSongOptions: GetSongsOptions; }): Promise<Song[]> {
        const { startId, excludedIds = [], random = false, reverse = false } = getSongOptions;

        const baseConditions: Prisma.Sql[] = [
            Prisma.sql`"PlaylistSongs"."playlistId" = ${playlistId}`,
        ];

        const fetchSongs = async (extraCondition?: Prisma.Sql[], backwards?: Reverse) => {
            const conditions = [...baseConditions];

            extraCondition?.forEach((condition) => conditions.push(condition));

            if (excludedIds.length > 0) {
                conditions.push(Prisma.sql`id NOT IN (${Prisma.join(excludedIds)})`);
            }

            const whereClause = conditions.length
            ? Prisma.sql`WHERE ${Prisma.join(conditions, ` AND `)}`
            : Prisma.sql``;

            let orderBy: Prisma.Sql;

            if (random === Random.TRUE) {
                orderBy = Prisma.sql`ORDER BY RANDOM()`;
            } else if (backwards === Reverse.TRUE) {
                orderBy = Prisma.sql`ORDER BY "id" DESC`;
            } else {
                orderBy = Prisma.sql`ORDER BY "id" ASC`;
            }
            
            const sql = Prisma.sql`
                SELECT "Songs".* FROM "Songs"
                INNER JOIN "PlaylistSongs" ON "PlaylistSongs"."songId" = "Songs"."id"
                ${whereClause}
                ${orderBy}
                LIMIT 5
            `;

            const res = await this.prisma.$queryRaw<PrismaSongs[]> (sql);

            return res
        }

        let songs: PrismaSongs[]

        if(startId && reverse === Reverse.TRUE) {
            songs =  await fetchSongs([Prisma.sql`"Songs"."id" < ${startId}`])

            if(songs.length === 0) {
                songs =  (await fetchSongs([Prisma.sql`"Songs"."id" > ${startId}`], Reverse.TRUE)).reverse()
            }
        } else if(startId && reverse === Reverse.FALSE) {
            songs = await fetchSongs([Prisma.sql`"Songs"."id" > ${startId}`])

            if (songs.length === 0) {
                songs = await fetchSongs();
            }
        } else {
            songs = await fetchSongs()
        }

        return songs.map(PrismaSongMapper.toDomain)
    }
}