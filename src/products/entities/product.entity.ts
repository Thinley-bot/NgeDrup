import { Category } from "src/categories/entities/category.entity"
import { Review } from "src/reviews/entities/review.entity"
import { User } from "src/users/entities/user.entity"
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, TreeChildren, UpdateDateColumn} from "typeorm"

@Entity({name:"products"})
export class Product {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column({type:'decimal', precision:10,scale:2, default:0})
    price:number

    @Column()
    stock:number

    @Column('simple-array')
    images:string[]

    @CreateDateColumn()
    createdAt:Timestamp

    @UpdateDateColumn()
    updateAt:Timestamp

    @Column()
    createdBy: number;

    @ManyToOne(()=>User,(user)=>user.product)
    @JoinColumn({ name: "createdBy" })
    addedBy: User

    @ManyToOne(()=>Category,(category)=>category.product)
    category:Category

    @OneToMany(()=>Review,(review)=>review.products)
    reviews:Review[]
}
