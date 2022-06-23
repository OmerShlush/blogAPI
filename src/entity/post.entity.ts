import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    headline: string
    
    @Column()
    context: string
    
    @Column()
    image: string

    @Column()
    date: Date
}
