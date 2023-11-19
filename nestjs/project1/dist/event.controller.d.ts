import { Repository } from "typeorm";
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from "./update-event.dto";
export declare class EventsController {
    private readonly repository;
    constructor(repository: Repository<Event>);
    findAll(): Promise<Event[]>;
    Practice(): Promise<Event[]>;
    findOne(id: any): Promise<Event>;
    create(input: CreateEventDto): Promise<{
        when: Date;
        name: string;
        description: string;
        address: string;
    } & Event>;
    update(id: any, input: UpdateEventDto): Promise<{
        when: Date;
        name: string;
        description: string;
        address: string;
        id: number;
    } & Event>;
    remove(id: any): Promise<void>;
}
