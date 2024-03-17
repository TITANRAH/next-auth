import { NextResponse } from "next/server";
import db from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(req: any) {
  try {
    // obtengo la data el fetch haca aca esta en action createUser
    const data = await req.json();

    // busco si existe el email
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // busco si existe el username

    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    console.log("data desde server Post", data);

    //   si exsitenel mail no puede crear y retorna mesnsae y 400
    if (userFound) {
      return NextResponse.json(
        {
          message: "El email ya existe",
        },
        {
          status: 400,
        }
      );
    }

    //   si exsitenel username no puede crear y retorna mesnsae y 400

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "El username ya existe",
        },
        {
          status: 400,
        }
      );
    }

    //   hassheo la pass si paso las validaciones
    const hashPass = await bcrypt.hash(data.password, 10);

    //   creo el usuario con pass hasheada y pass encriptado
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashPass,
      },
    });

    //   preparo la devolucion y quito passs del objeto user
    const { password, ...user } = newUser;

    //   devuelvo solo user
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
