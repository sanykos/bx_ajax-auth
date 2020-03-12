<?
// Регистрация по email
AddEventHandler("main", "OnBeforeUserRegister", Array("CCustomRegHookEvent", "OnBeforeUserRegisterHandler"));
class CCustomRegHookEvent 
{ 
   function OnBeforeUserRegisterHandler(&$arFields) 
    { 
          $arFields["LOGIN"] = $arFields["EMAIL"]; 
    } 
}

// Авторизация через email
AddEventHandler("main", "OnBeforeUserLogin", array("CCustomAuthHookEvent", "DoBeforeUserLoginHandler"));
class CCustomAuthHookEvent {
        //  Проверяем пришел ли email или login и если email авторизуем по нему
        function DoBeforeUserLoginHandler( &$arFields )
        {
            $userLogin = $_POST["USER_LOGIN"];
            if (isset($userLogin))
            {
                $isEmail = strpos($userLogin,"@");
                if ($isEmail>0)
                {
                    $arFilter = Array("EMAIL"=>$userLogin);
                    $rsUsers = CUser::GetList(($by="id"), ($order="desc"), $arFilter);
                    if($res = $rsUsers->Fetch())
                    {
                        if($res["EMAIL"]==$arFields["LOGIN"])
                            $arFields["LOGIN"] = $res["LOGIN"];
                    }
                }
            }
        }
}
