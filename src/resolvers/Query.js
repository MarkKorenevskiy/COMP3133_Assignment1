export function getAllEmployees(parent, args, context, info) {
    return context.prisma.employee.findMany();
}

export function getEmployee(parent, args, context, info) {
    return context.prisma.employee.findUnique({where: {id: args.id}});
}

export function info() {
    return "Assignment 1"
}