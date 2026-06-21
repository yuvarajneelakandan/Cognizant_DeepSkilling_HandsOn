BEGIN
    FOR customer_record IN (
        SELECT CustomerID
        FROM CUSTOMERS
        WHERE Balance > 10000
    ) LOOP

        UPDATE CUSTOMERS
        SET IsVIP = 'TRUE'
        WHERE CustomerID = customer_record.CustomerID;

        DBMS_OUTPUT.PUT_LINE(
            'Customer ID '
            || customer_record.CustomerID
            || ' promoted to VIP status.'
        );

    END LOOP;

    COMMIT;
END;
