package com.social.usermgmt.mapper;

import com.social.usermgmt.domain.Profile;
import com.social.usermgmt.dto.ProfileRequest;
import com.social.usermgmt.dto.ProfileResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    Profile toEntity(ProfileRequest dto);
    ProfileResponse toDto(Profile entity);
}