import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../src/auth/prisma.service'; // Se estiver usando Prisma

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { message: 'Usuário registrado com sucesso!', user };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciais inválidas');

    const token = jwt.sign({ sub: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { token, user };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('E-mail não encontrado');

    const resetToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Aqui você enviaria o e-mail com o link:
    // `http://localhost:3000/reset-password?token=${resetToken}`

    return { message: 'E-mail de redefinição enviado!', token: resetToken };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET) as { sub: number };
      const hashed = await bcrypt.hash(newPassword, 10);
      await this.prisma.user.update({
        where: { id: payload.sub },
        data: { password: hashed },
      });
      return { message: 'Senha redefinida com sucesso!' };
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
