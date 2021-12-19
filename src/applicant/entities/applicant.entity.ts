import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'applicants',
  paranoid: true,
})
export class Applicant extends Model<Applicant> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  firstName: string;

  @Column({
    allowNull: false,
  })
  lastName: string;

  @Column({
    allowNull: false,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.DATEONLY,
  })
  dob: string;

  @Column({
    allowNull: false,
  })
  location: string;

  @Column({
    allowNull: false,
  })
  photo: string;

  @Column
  salaryPerQuater: number;

  @Column
  creditCardDebtAmount: number;

  @Column
  homeLoaDebtAmount: number;

  @Column
  carLoaDebtAmount: number;

  @Column
  totalBankSavingsAmount: number;

  @Column
  nameOfStock: string;

  @Column
  valueOfStock: number;

  @Column
  status: string;
}
