CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest 
AS 
BEGIN 
    UPDATE ACCOUNTS 
    SET Balance = Balance + (Balance * 0.01) 
    WHERE AccountType = 'SAVINGS'; 
    COMMIT; 
    
    DBMS_OUTPUT.PUT_LINE( 'Monthly interest applied successfully.' ); 
END;

-- Execute Procedure 
BEGIN 
    ProcessMonthlyInterest; 
END;