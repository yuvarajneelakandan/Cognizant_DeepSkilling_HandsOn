CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus ( 
    p_department_id IN NUMBER,
    p_bonus_percent IN NUMBER ) 
AS 
BEGIN
    UPDATE EMPLOYEES 
    SET Salary = Salary + (Salary * p_bonus_percent / 100)
    WHERE DepartmentID = p_department_id; 
    COMMIT; 
    
    DBMS_OUTPUT.PUT_LINE( 'Bonus updated for Department ID: ' || p_department_id ); 
    
END;

-- Execute Procedure
BEGIN 
    UpdateEmployeeBonus(10, 5); 
END;