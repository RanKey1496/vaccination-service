import { Drug } from '../../src/entity/drug';

export default class DrugTestBuilder {
    
    private drug: Drug;

    public static newDrug() {
        return new DrugTestBuilder;
    }

    public withId(id: number): DrugTestBuilder {
        this.drug.id = id;
        return this;
    }

    public withName(name: string): DrugTestBuilder {
        this.drug.name = name;
        return this;
    }

    public withApproved(approved: boolean): DrugTestBuilder {
        this.drug.approved = approved;
        return this;
    }

    public withMinDose(minDose: number): DrugTestBuilder {
        this.drug.minDose = minDose;
        return this;
    }

    public withMaxDose(maxDose: number): DrugTestBuilder {
        this.drug.maxDose = maxDose;
        return this;
    }

    public withAvailableAt(availableAt: Date): DrugTestBuilder {
        this.drug.availableAt = availableAt;
        return this;
    }

    public withEmptyData(): DrugTestBuilder {
        return this;
    }

    public withValidValues(): DrugTestBuilder {
        return this.withId(1).withName('Jhon Gil').withApproved(true).withMinDose(2)
            .withMaxDose(10).withAvailableAt(new Date());
    }

    public withInvalidValues(): DrugTestBuilder {
        const sevenDaysBefore = new Date();
        sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);
        return this.withId(0).withName('J').withApproved(false).withMinDose(Infinity)
        .withMaxDose(-Infinity).withAvailableAt(sevenDaysBefore);
    }

    public build(): Drug {
        return this.drug;
    }

}