## Firebase rule
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
      allow create: if request.auth.uid != null;
    }
  }
}

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if resource.data.uid != null &&
      											resource.data.uid == request.auth.uid;
      allow create: if request.auth.uid != null;
    }
  }
}

service cloud.firestore {
  match /databases/{database}/documents {
    match /{doc=**} {
      allow read, write, update, delete:
      	if resource != null &&
      		 resource.data.uid == request.auth.uid;
      allow create: if request.auth.uid != null;
    }
  }
}

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write:
      	if  resource != null &&
        		resource.data.uid != null &&
        		resource.data.uid == request.auth.uid;
      allow create:
      	if request.auth.uid != null &&
        	 request.resource.data != null &&
        	 request.resource.data.uid != null &&
           request.resource.data.uid == request.auth.uid;
    }
  }
}

```
### if you want to use it with fluid on mac

# Create you fluid app with everylog
# Run the app
# Open Preference menu (next to apple icon on the menu bar)
# Select Whitelist tab
# Allow browsing to any URL or add google auth and firebase url on teh allow list
