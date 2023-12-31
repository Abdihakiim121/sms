import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./Dto/login.dto";
import {UserEntity} from "../user/user.entity";
import {Loginhistories} from "../user/loginhistories.entity";

@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
                private jwtService: JwtService) {
    }

    async createToken(user: any) {
        const data = await this.usersService.fetchSpecificUserData(user.userId);
        const payload = {user: data};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username:string, password:string): Promise<UserEntity> {
        const user = await this.usersService.getByUsernameAndPass(
            username,
            password,
        );
        if (!user) {
            throw new UnauthorizedException(
                'Could not authenticate. Please try again.',
            );
        }
        return user;
    }

    async getUserInfo(request: any, user: any): Promise<Loginhistories> {
        const userAgent = request.headers['user-agent'];
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

        const loginHistoryInfo = {
            ip,
            browser: userAgent,
            userId: user.userId,
        }
        const loginHistoryId = await this.usersService.addLoginHisotry(loginHistoryInfo, user);

        return loginHistoryId;
    }
}
