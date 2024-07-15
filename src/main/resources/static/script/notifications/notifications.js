$(document).ready(function() {
    const notificationsElement = $("#notifications");
    const userId = notificationsElement.data("user-id");
    const notificationCountElement = $("#notificationCount");

    if (userId) {
        $.ajax({
            url: "/user/notifications/count",
            method: "GET",
            success: function(data) {
                if (data.count !== undefined) {
                    notificationCountElement.text(data.count);
                } else {
                    notificationCountElement.text("Error: Count not found");
                }
            },
            error: function(xhr, status, error) {
                notificationCountElement.text("Error fetching notification count");
                console.error("Error fetching notification count:", error);
            }
        });

        const eventSource = new EventSource(`/notifications/${userId}/events`);

        eventSource.onmessage = function(event) {
            const newElement = $("<li>").text(event.data);
            notificationsElement.append(newElement);
        };

        eventSource.onerror = function(event) {
            console.error("Error occurred: ", event);
        };

        $("#sendNotificationButton").click(function() {
            $.ajax({
                url: `/send-message?userId=${userId}`,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify("새로운 쪽지가 도착했습니다!"),
                error: function(xhr, status, error) {
                    console.error("Error sending message:", error);
                }
            });
        });
    } else {
        console.error("User ID not found in session");
    }
});
