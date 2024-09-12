// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   const groupId = "Oreo";
//   const initialGroup = await prisma.group.upsert({
//     where: { groupId },
//     update: {},
//     create: {
//       groupId,
//       name: "Oreo Chat",
//     },
//   });
//   console.log({ initialGroup });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });