import { Injectable } from '@nestjs/common'
import { History } from '../entities/history';
import { IPagination, IPaginationResponse } from 'src/core/pagination';

@Injectable()
export abstract class IHistoryRepository {
    abstract create(history: History): Promise<History>
    abstract getAll(pagination: IPagination): Promise<{
        history: History[],
        paginationsReponse: IPaginationResponse
    }>
    abstract delete(): Promise<void>
    abstract deleteOne(id: string): Promise<void>
    abstract getFirst(): Promise<History | undefined>
    abstract update(history: History): Promise<History>
}
