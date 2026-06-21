BEGIN
    FOR customer_record IN (
        SELECT c.CustomerID, l.LoanID
        FROM CUSTOMERS c
        JOIN LOANS l
        ON c.CustomerID = l.CustomerID
        WHERE c.Age > 60
    ) LOOP

        UPDATE LOANS
        SET InterestRate = InterestRate - 1
        WHERE LoanID = customer_record.LoanID;

        DBMS_OUTPUT.PUT_LINE(
            'Discount applied for Customer ID: '
            || customer_record.CustomerID
        );

    END LOOP;

    COMMIT;
END;
/