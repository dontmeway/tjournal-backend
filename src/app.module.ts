import { CommentEntity } from './comment/entities/comment.entity';
import { PostEntity } from './post/entities/post.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from './user/entities/user.entity';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "tjournal",
    password: "112324306",
    entities: [UserEntity, PostEntity, CommentEntity],
    synchronize: true
  }),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
