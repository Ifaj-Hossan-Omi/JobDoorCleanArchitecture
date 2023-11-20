import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class interviewerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        // return (request.session.id !== undefined && request.session.usertype === "interviewer");
        if( request.session.user_id !== undefined && request.session.usertype === "interviewer"){
            return true;
        }
        return false;
    }
}