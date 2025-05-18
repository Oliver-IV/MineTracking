import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('banned_tokens')
export class BannedToken {
    
    @PrimaryGeneratedColumn({name: "token_id"})
    id: number;

    @Column({name: "token", unique: true, nullable: false})
    token: string;
}