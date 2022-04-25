echo "Enter owner name that has contract:"
read OWNER_

export OWNER=$OWNER_

echo "Enter contract name to play game:"
read CONTRACT_

export CONTRACT=$CONTRACT_

echo "Entering game with 1 NEAR..."
near call $OWNER getTicket --account-id $CONTRACT


echo "Game ended and your score is 100, so you earn 1NEAR"
near call $OWNER finishGame '{"amount":"10000000000000000000000"}' --account-id $CONTRACT

