package com.social.usermgmt.service;

import com.social.usermgmt.dto.*;

public interface UserMgmtService {
     SignupResponse signup(SignupRequest request) ;
     SigninResponse signin(SigninRequest request) ;
     SignoutResponse signout();
}
