import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Entity('users')
export class User {
    
    @PrimaryColumn({name: "user_id"})
    id: string;

    @Column({name: "name", nullable: false})
    name: string;

    @Column({name: "last_name", nullable: false})
    lastName: string;

    @Column({name: "email", unique: true, nullable: false})
    email: string;

    @Column({name: "password", nullable: false})
    password: string;

    @BeforeInsert()
    generateUid() {
        this.id = crypto.randomUUID();
    }

    @BeforeInsert()
    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

}