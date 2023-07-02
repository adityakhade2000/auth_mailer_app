import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserType{
    ADMIN = 'ADMIN',
    USER = 'USER'
}

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        name:"firstname",
        nullable:false
    })
    firstName: string;

    @Column({
        type:"varchar",
        name:"lastname",
        nullable:false,
    })
    lastName: string;

    @Column({
        type:"varchar",
        name:"email",
        nullable:false,
        unique: true
    })
    email: string;

    @Column({
        type:"varchar",
        name:"mobile",
        nullable:false,
        unique: true,
    })
    mobile: string;
    
    @Column({
        type:"varchar",
        name:"password",
        nullable: false,
    })
    @Exclude()
    password: string;

    @Column({
        type:"varchar",
        name:"otp",
        nullable: false 
    })
    otp: string;

    @Column({
        type:"text",
        name: "access_token",
        nullable: true
    })
    @Exclude()
    accessToken: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'user_type',
        default: UserType.USER
    })
    userType: UserType;

    @Column({
        name:"isveryfied",
        default:false,
     })
     isveryfied:boolean;

    @Column({
        type:"timestamp",
        name:"last_login_at",
        nullable: true,
        default:null
    })
    public lastLoginAt: Date | null;

     /*
    * Create and Update Date Columns
    */
     @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
     public createdAt!: Date;
 
     @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
     public updatedAt!: Date;
}