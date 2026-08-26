"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { DollarSign, Percent } from "lucide-react";

interface MortgageCalculatorProps {
    homePrice: number;
}

export function MortgageCalculator({ homePrice }: MortgageCalculatorProps) {
    const [price, setPrice] = useState(homePrice);
    const [downPayment, setDownPayment] = useState(homePrice * 0.2); // 20% default
    const [rate, setRate] = useState(8.5); // India average home loan rate
    const [years, setYears] = useState(20);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const calculateEMI = () => {
        const principal = price - downPayment;
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;

        if (monthlyRate === 0) {
            setMonthlyPayment(principal / months);
            return;
        }

        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        setMonthlyPayment(Math.round(emi));
    };

    useEffect(() => {
        calculateEMI();
    }, [price, downPayment, rate, years]);

    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-brand-600" />
                Monthly Cost Estimator
            </h3>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-1">
                    <div className="text-4xl font-black text-brand-700 mb-2">
                        ₹{monthlyPayment.toLocaleString('en-IN')}<span className="text-lg text-gray-400 font-medium">/mo</span>
                    </div>
                    <p className="text-sm text-gray-500">Estimated EMI for {years} years loan</p>
                </div>
                {/* Donut Chart / Breakdown could go here */}
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Home Price</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="pl-8"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Down Payment</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                            <Input
                                type="number"
                                value={downPayment}
                                onChange={(e) => setDownPayment(Number(e.target.value))}
                                className="pl-8"
                            />
                        </div>
                        <p className="text-xs text-brand-600 font-bold mt-1 text-right">
                            {((downPayment / price) * 100).toFixed(1)}%
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Interest Rate</label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="pr-8"
                                step="0.1"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Loan Term: {years} Years</label>
                    <Slider
                        value={[years]}
                        min={5}
                        max={30}
                        step={1}
                        onValueChange={(val) => setYears(val[0])}
                        className="py-4"
                    />
                </div>
            </div>
        </div>
    );
}
