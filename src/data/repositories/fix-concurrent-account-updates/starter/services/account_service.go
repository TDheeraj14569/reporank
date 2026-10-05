package services

type Account struct {
	Balance int
}

func UpdateBalance(acc *Account, amount int) {
	// BUG: Not using mutex/lock for concurrent update
	acc.Balance += amount
}
