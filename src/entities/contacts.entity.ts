import { Client } from "./client.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    completeName: string

    @Column()
    email: string

    @Column()
    phone: number

    @CreateDateColumn({type: "date" })
    registerDate: string
    
    @ManyToOne(() => Client, client => client.contacts)
    client: Client

}