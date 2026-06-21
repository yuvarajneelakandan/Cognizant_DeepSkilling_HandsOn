BEGIN
    FOR loan_record IN (
        SELECT c.CustomerName,
               l.LoanID,
               l.DueDate
        FROM CUSTOMERS c
        JOIN LOANS l
        ON c.CustomerID = l.CustomerID
        WHERE l.DueDate BETWEEN SYSDATE AND SYSDATE + 30
    ) LOOP

        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Dear '
            || loan_record.CustomerName
            || ', your loan (Loan ID: '
            || loan_record.LoanID
            || ') is due on '
            || TO_CHAR(loan_record.DueDate, 'DD-MON-YYYY')
        );

    END LOOP;
END;
