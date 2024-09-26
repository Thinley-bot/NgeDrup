import { Product } from "src/products/entities/product.entity"
import { User } from "src/users/entities/user.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"

@Entity({name:"reviews"})
export class Review {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    ratings:number

    @Column()
    comment:string

    @CreateDateColumn()
    createdAt:Timestamp

    @UpdateDateColumn()
    updatedAt:Timestamp

    @Column()
    createdBy:number

    @Column()
    product:number

    @ManyToOne(()=>User,(user)=>user.reviews)
    @JoinColumn({name:"createdBy"})
    addedBy:User

    @ManyToOne(()=>Product,(product)=>product.reviews)
    @JoinColumn({name:"product"})
    products:Product
}
