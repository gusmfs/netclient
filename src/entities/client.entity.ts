import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { Contact } from "./contacts.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity()
export class Client{
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column()
    completeName : string;

    @Column({ unique: true })
    email : string;

    @Column({length: 120})
    password : string;

    @Column({ unique: true , type: "bigint"})
    phone: number;

    @CreateDateColumn({type: "date" })
    registerDate: string
    
    @OneToMany(() => Contact, contact => contact.client)
    contacts: Contact[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const hasRounds : number = getRounds(this.password);

        if(!hasRounds){
            this.password = hashSync(this.password, 10);
        }
    }
}