large_stream_data = """
    This is an introductory message to the stream.
    '''table
    {
       "headers": [
           "timestamp",
           "user_id",
           "message_id",
           "message_type",
           "content",
           "channel",
           "is_moderated",
           "engagement_count"
       ],
       "messages": [
           {
               "timestamp": "2024-01-25T10:00:00Z",
               "user_id": "user_123",
               "message_id": "msg_1",
               "message_type": "text",
               "content": "Hello everyone! How's the stream today? 👋",
               "channel": "main",
               "is_moderated": false,
               "engagement_count": 5
           },
           {
               "timestamp": "2024-01-25T10:00:05Z",
               "user_id": "user_456",
               "message_id": "msg_2",
               "message_type": "emoji",
               "content": "🎉",
               "channel": "main",
               "is_moderated": false,
               "engagement_count": 3
           },
           {
               "timestamp": "2024-01-25T10:00:08Z",
               "user_id": "user_789",
               "message_id": "msg_3",
               "message_type": "text",
               "content": "The graphics look amazing today!",
               "channel": "main",
               "is_moderated": false,
               "engagement_count": 7
           },
           {
               "timestamp": "2024-01-25T10:00:15Z",
               "user_id": "mod_001",
               "message_id": "msg_4",
               "message_type": "system",
               "content": "Welcome to the stream! Remember to follow our community guidelines.",
               "channel": "announcements",
               "is_moderated": true,
               "engagement_count": 0
           },
           {
               "timestamp": "2024-01-25T10:00:20Z",
               "user_id": "user_234",
               "message_id": "msg_5",
               "message_type": "gif",
               "content": "excited.gif",
               "channel": "main",
               "is_moderated": false,
               "engagement_count": 12
           }
       ]
    }
    '''
    This is the end of the introductory message.
    """