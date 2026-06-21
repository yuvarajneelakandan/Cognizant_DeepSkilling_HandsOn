CREATE OR REPLACE PROCEDURE TransferFunds ( 
    p_source_account IN NUMBER, 
    p_target_account IN NUMBER, 
    p_amount IN NUMBER ) 
AS 
  v_balance NUMBER; 
BEGIN 
   SELECT Balance 
   INTO v_balance 
   FROM ACCOUNTS 
   WHERE AccountID = p_source_account; 
   
   IF v_balance >= p_amount THEN 
   UPDATE ACCOUNTS 
   SET Balance = Balance - p_amount 
   WHERE AccountID = p_source_account; 
   UPDATE ACCOUNTS 
   SET Balance = Balance + p_amount 
   WHERE AccountID = p_target_account; 
   COMMIT; 
   DBMS_OUTPUT.PUT_LINE( 'Transfer completed successfully.' ); 
ELSE 
   DBMS_OUTPUT.PUT_LINE( 'Insufficient balance.' ); 
END IF; 
EXCEPTION 
   WHEN NO_DATA_FOUND THEN 
      DBMS_OUTPUT.PUT_LINE( 'Invalid account number.' ); 
   WHEN OTHERS THEN 
      ROLLBACK; 
      DBMS_OUTPUT.PUT_LINE( 'Error: ' || SQLERRM ); 
END;

-- Execute Procedure 
BEGIN 
   TransferFunds(1001, 1002, 500); 
END;