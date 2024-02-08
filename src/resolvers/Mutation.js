import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {checkUserId, SECRET_KEY} from "../utils.js";

export function addNewEmployee(parent, args, context, info) {
    checkUserId(context);
    return context.prisma.employee.create({
        data: {...args}
    });
}

export async function updateEmployee(parent, args, context, info) {
    checkUserId(context);
    return context.prisma.employee.update({
        where: {id: args.id},
        data: {
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
            gender: args.gender,
            salary: args.salary
        }
    });
}

export async function deleteEmployee(parent, args, context, info) {
    checkUserId(context);
    return context.prisma.employee.delete({where: {id: args.id}});
}

export async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.user.create({
        data: {...args, password}
    });

    const token = jwt.sign({id: user.id}, SECRET_KEY);

    return {
        token,
        user
    };
}

export async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({where: {email: args.email}});

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({user: user.id}, SECRET_KEY);
    return {
        token,
        user
    };
}