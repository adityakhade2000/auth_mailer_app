import { MigrationInterface, QueryRunner } from "typeorm"

export class createUserTable1687317484420 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create extension if not exists "uuid-ossp";
        `);

        await queryRunner.query(
            `create table if not exists users(
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                firstName VARCHAR(40),
                lastName VARCHAR(40), 
                email VARCHAR(40) UNIQUE,
                mobile VARCHAR(12) UNIQUE,
                password VARCHAR(60),
                otp VARCHAR(4),
                access_token TEXT DEFAULT NULL,
                user_type varchar default 'USER',
                isveryfied BOOLEAN default false,
                last_login_at TIMESTAMP DEFAULT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                primary key (id)
            );
        `); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE users;
        `)
    }

}
