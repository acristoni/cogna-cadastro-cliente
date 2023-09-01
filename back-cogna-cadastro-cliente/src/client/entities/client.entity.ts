import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { EstadoCivil } from '../enums/estadocivil.enum';
  
@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @Column({ type: 'varchar' })
    nome: string;  

    @Column({ type: 'date' })
    dataNascimento: Date;

    @Column({ unique: true, length: 11 })
    cpf: string;
    
    @Column({ type: 'enum', enum: EstadoCivil, default: EstadoCivil.SOLTEIRO })
    estadoCivil: EstadoCivil;
}
  
