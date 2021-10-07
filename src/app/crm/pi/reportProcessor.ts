import { default as converter } from 'number-to-words';

export class ReportProcessor {
    totalQt: number;
    totalAmount: number;
    discount: number;
    discountAmount: number;
    finalAmount: number;

    constructor(workOrders: any[]) {
			this.totalQt = 0;
			this.totalAmount = 0;
    	workOrders.forEach((element: any) => {
        this.totalQt += element.OrderQty;
        this.totalAmount += element.OrderValue;
      });
      this.discount = workOrders[0].Pi_Discount;
      this.discountAmount = this.totalAmount * (this.discount / 100)
      this.finalAmount = this.totalAmount - this.discountAmount;
		}
		
		getAmountInWords(): string {
      let amountInWords = `U.S Dollars ` + converter.toWords(Math.floor(this.finalAmount));
      const amountString = this.finalAmount.toFixed(2);
      const decimalValue = Number.parseInt(amountString.substring(amountString.indexOf('.') + 1));
			if(decimalValue) amountInWords += ' AND ' + converter.toWords(decimalValue) + ' CENTS ONLY';
			return amountInWords;
		}
}