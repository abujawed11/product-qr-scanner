# 🔧 Developer Dashboard Documentation

## Overview
The Developer Dashboard is a **hidden administrative interface** that provides dangerous capabilities for data management. This interface is **NOT visible** to regular users or admins and requires special credentials.

## Access Methods

### Method 1: Direct Login
Users with developer credentials will be automatically redirected to the developer dashboard upon login:

**Allowed Usernames:**
- `developer`
- `dev_admin`
- `abujawed11`
- Any user with email: `developer@company.com`

### Method 2: Secret Access (Alternative)
For users already logged in with developer credentials:
1. Go to the main dashboard
2. **Tap the "Welcome to Sunrack Warranty App" text 7 times**
3. A prompt will appear asking for developer mode access
4. Accept to enter the developer dashboard

## Features

### 🗑️ Delete Warranty Claims
- **Path**: `/(developer)/delete-claims`
- **Capability**: Permanently delete warranty requests and ALL associated uploads
- **Warning**: This action cannot be undone
- **Features**:
  - Search and filter claims
  - View claim details before deletion
  - Confirmation dialogs with full details
  - Real-time status updates

### 👤 Delete Users
- **Path**: `/(developer)/delete-users`
- **Capability**: Permanently delete user accounts and ALL their data
- **Warning**: This will also delete all warranty claims and uploads by that user
- **Features**:
  - Separate admin and client user sections
  - Search by username, email, client ID, or company
  - User statistics and account status
  - Confirmation dialogs with impact warnings

### 🔧 Additional Tools
- System logs viewer (placeholder)
- Cache clearing functionality
- Application debugging tools

## Security Features

### Access Control
- **Username-based access**: Only specific usernames allowed
- **Email-based access**: Specific developer emails allowed
- **Automatic redirection**: Non-developers redirected to normal dashboards
- **No UI exposure**: Developer options never shown to regular users

### Safety Mechanisms
- **Multiple confirmation dialogs** for destructive actions
- **Detailed impact warnings** before deletions
- **Visual danger indicators** (red colors, warning icons)
- **Action logging** for audit trails

## Backend Requirements

The following API endpoints need to be implemented on your Django backend:

### Developer Claims Management
```python
# GET /developer/warranty-claims/
# Returns all warranty claims with basic info

# DELETE /developer/warranty-claims/{claim_id}/delete/
# Deletes warranty claim and all associated uploads
```

### Developer User Management
```python
# GET /developer/users/
# Returns all users with account details

# DELETE /developer/users/{user_id}/delete/
# Deletes user and all associated data
```

### Implementation Example (Django)
```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_warranty_claim(request, claim_id):
    # Check if user has developer permissions
    if not is_developer_user(request.user):
        return Response({'error': 'Access denied'}, status=403)
    
    claim = get_object_or_404(WarrantyClaim, war_req_id=claim_id)
    
    # Delete all associated uploads
    for upload in claim.uploads.all():
        upload.delete()  # This should also delete the physical files
    
    # Delete the claim
    claim.delete()
    
    return Response({'message': 'Claim deleted successfully'})

def is_developer_user(user):
    developer_usernames = ['developer', 'dev_admin', 'abujawed11']
    developer_emails = ['developer@company.com']
    
    return (
        user.username in developer_usernames or 
        user.email in developer_emails or
        user.account_type == 'developer'
    )
```

## File Structure
```
app/(developer)/
├── _layout.tsx          # Developer route protection and navigation
├── index.tsx            # Main developer dashboard
├── delete-claims.tsx    # Warranty claims deletion interface
└── delete-users.tsx     # User deletion interface
```

## UI/UX Design
- **Dark theme** with red accents to indicate danger
- **Warning banners** throughout the interface
- **Confirmation dialogs** for all destructive actions
- **Loading states** and error handling
- **Search and filter** capabilities
- **Real-time updates** using React Query

## Usage Guidelines

### For Developers
1. **Always backup data** before using deletion features
2. **Understand the impact** - deletions are permanent
3. **Use search filters** to find specific items
4. **Read confirmation dialogs** carefully
5. **Monitor server logs** for any issues

### For Backend Developers
1. **Implement proper authentication** checks
2. **Add audit logging** for all developer actions
3. **Ensure cascade deletions** work properly
4. **Test file deletion** thoroughly
5. **Consider soft deletes** as an alternative

## Security Considerations

### ⚠️ Important Security Notes
- Developer credentials should be kept strictly confidential
- Consider implementing IP restrictions for developer access
- Log all developer actions for audit purposes
- Regularly review developer user list
- Consider implementing time-based access tokens

### Production Deployment
- Ensure developer accounts are properly secured
- Consider disabling developer dashboard in production
- Implement additional authentication layers if needed
- Monitor developer dashboard usage

## Troubleshooting

### Common Issues
1. **"Access Denied"**: User doesn't have developer credentials
2. **API Errors**: Backend endpoints not implemented
3. **File Deletion Fails**: Server permissions or file locks
4. **Navigation Issues**: Route protection not working

### Debug Steps
1. Check user credentials in AuthContext
2. Verify API endpoint responses
3. Check network connectivity
4. Review server logs for errors

---

## ⚠️ DANGER ZONE WARNING
This developer dashboard provides **irreversible data deletion capabilities**. Use with extreme caution and ensure you have proper backups before performing any destructive operations.

