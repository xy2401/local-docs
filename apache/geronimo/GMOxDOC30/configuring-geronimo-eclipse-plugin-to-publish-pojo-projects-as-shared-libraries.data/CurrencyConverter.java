package myPackage;

import java.math.BigDecimal;

public class CurrencyConverter {
	
	private static BigDecimal rupeeRate = new BigDecimal("39.3881");
	private static BigDecimal euroRate = new BigDecimal("0.0170853");

	public static BigDecimal dollarToRupees(BigDecimal dollars) {
		BigDecimal result = dollars.multiply(rupeeRate);
		return result.setScale(2, BigDecimal.ROUND_UP);
	}

	public static BigDecimal rupeesToEuro(BigDecimal rupees) {
		BigDecimal result = rupees.multiply(euroRate);
		return result.setScale(2, BigDecimal.ROUND_UP);
	}
}