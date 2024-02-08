export function addNewEmployee(parent, args, context, info) {
    return context.prisma.employee.create({
        data: {...args}
    });
}

export async function updateEmployee(parent, args, context, info) {
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
    return context.prisma.employee.delete({where: {id: args.id}});
}