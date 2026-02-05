import { View } from "react-native";
import { Card, Text, ProgressBar, useTheme } from "react-native-paper";
import { Budget, Transaction } from "../types";

interface BudgetCardProps {
  budget: Budget;
  transactions: Transaction[];
}

export function BudgetCard({ budget, transactions }: BudgetCardProps) {
  const theme = useTheme();
  
  // Calculate spent amount for this budget category
  const spent = transactions
    .filter((t) => t.type === "expense" && t.category.id === budget.categoryId)
    .reduce((sum, t) => sum + t.amount, 0);

  const percentage = Math.min(spent / budget.amount, 1);
  const isOverBudget = spent > budget.amount;
  const remaining = budget.amount - spent;

  const progressColor = isOverBudget 
    ? theme.colors.error 
    : percentage > 0.8 
      ? "#ff9800" 
      : theme.colors.primary;

  return (
    <Card style={{ margin: 8, borderRadius: 12 }}>
      <Card.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <Text variant="titleMedium">{budget.month}</Text>
          <Text variant="bodyMedium" style={{ color: isOverBudget ? theme.colors.error : "gray" }}>
            ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
          </Text>
        </View>
        
        <ProgressBar 
          progress={percentage} 
          color={progressColor}
          style={{ height: 10, borderRadius: 5 }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
          <Text variant="labelSmall" style={{ color: "gray" }}>
            {(percentage * 100).toFixed(0)}% used
          </Text>
          <Text variant="labelSmall" style={{ color: isOverBudget ? theme.colors.error : "green" }}>
            {isOverBudget ? `Over by $${Math.abs(remaining).toFixed(2)}` : `$${remaining.toFixed(2)} left`}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
