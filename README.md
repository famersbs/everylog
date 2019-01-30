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
