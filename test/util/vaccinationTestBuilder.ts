import { Drug } from '../../src/entity/drug';
import { Vaccination } from '../../src/entity/vaccination';
import DrugTestBuilder from './drugTestBuilder';

export default class VaccionationTestBuilder {
    
    private vaccionation: Vaccination = new Vaccination;

    public static newVaccionation() {
        return new VaccionationTestBuilder;
    }

    public withId(id: number): VaccionationTestBuilder {
        this.vaccionation.id = id;
        return this;
    }

    public withName(name: string): VaccionationTestBuilder {
        this.vaccionation.name = name;
        return this;
    }

    public withDrug(drug: Drug): VaccionationTestBuilder {
        this.vaccionation.drug = drug;
        return this;
    }

    public withDose(dose: number): VaccionationTestBuilder {
        this.vaccionation.dose = dose;
        return this;
    }

    public withDate(date: Date): VaccionationTestBuilder {
        this.vaccionation.date = date;
        return this;
    }

    public withEmptyData(): VaccionationTestBuilder {
        return this;
    }

    public withValidValues(): VaccionationTestBuilder {
        const sevenDaysAfter = new Date();
        sevenDaysAfter.setDate(sevenDaysAfter.getDate() + 7);
        const drug = DrugTestBuilder.newDrug().withValidValues().build();
        return this.withId(1).withName('Jhon Gil').withDrug(drug).withDose(5)
            .withDate(sevenDaysAfter);
    }

    public withInvalidValues(): VaccionationTestBuilder {
        const drug = new Drug();
        return this.withId(1).withName('Jhon Gil').withDrug(drug).withDose(-1)
            .withDate(new Date());
    }

    public build(): Vaccination {
        return this.vaccionation;
    }

}