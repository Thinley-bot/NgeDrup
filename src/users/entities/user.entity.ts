import { Entity, PrimaryGeneratedColumn,Column, IsNull, CreateDateColumn, Timestamp, UpdateDateColumn, OneToMany } from "typeorm";

import { Role } from "src/utility/common/user-roles.enum";
import { UserId } from "../types/create-user.type";
import { Category } from "src/categories/entities/category.entity";

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
        enum:Role,
        array:true,
        default:[Role.USER]
    })
    roles:Role;

    @CreateDateColumn()
    createdAt:Timestamp

    @UpdateDateColumn()
    updatedAt:Timestamp

    @OneToMany(()=>Category,(category)=>category.createdBy)
    category:Category
}
