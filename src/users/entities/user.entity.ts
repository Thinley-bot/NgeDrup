import { Entity, PrimaryGeneratedColumn,Column, IsNull, CreateDateColumn, Timestamp, UpdateDateColumn } from "typeorm";

import { Roles } from "src/utility/common/user-roles.enum";
import { UserId } from "../types/create-user.type";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn({primaryKeyConstraintName:"pk_user_id"})
    id:UserId;

    @Column()
    firstname:string;

    @Column({nullable:true})
    middlename:string;

    @Column({nullable:true})
    lastname:string;

    @Column({
        unique:true
    })
    email:string;

    @Column({select:false})
    password:string;

    @Column({
        type:'enum',
        enum:Roles,
        array:true,
        default:[Roles.USER]
    })
    roles:Roles;

    @CreateDateColumn()
    createdAt:Timestamp

    @UpdateDateColumn()
    updatedAt:Timestamp
}
