import { NotFoundException } from "@nestjs/common";
import { FindOneOptions, ObjectLiteral, Repository } from "typeorm";

export class BaseService<Entity extends ObjectLiteral> {
    constructor(protected readonly repo: Repository<Entity>) { }

    async findOneWithMapper<T>(
        id: number,
        relations: string[],
        mapFn: (entity: Entity) => T
    ): Promise<T> {
        const entity = await this.repo.findOne({
            where: { id } as any,
            relations
        } as FindOneOptions<Entity>);
        if (!entity) {
            throw new NotFoundException('Record not found');
        }
        return mapFn(entity);
    }

    async findAllWithMapper<T>(relations: string[], mapFn: (entity: Entity[]) => T): Promise<T> {
        const entity = await this.repo.find({ relations });
        return mapFn(entity);
    }
}