import notifee, {
  AndroidNotificationSetting,
  AuthorizationStatus,
  TriggerType,
} from '@notifee/react-native';
import {ITriggerNotification} from '../types/interface';
import moment from 'moment';

const requestNotificationPermission = async () => {
  const result = await notifee.requestPermission();
  return result.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
};

const setNotificationCategories = async ({
  outingTitle,
  taskTitle,
}: {
  outingTitle: string;
  taskTitle: string;
}) => {
  await notifee.setNotificationCategories([
    {
      id: 'outing',
      actions: [
        {
          id: 'task-all-complete',
          title: outingTitle,
        },
      ],
    },
    {
      id: 'task',
      actions: [
        {
          id: 'task-complete',
          title: taskTitle,
        },
      ],
    },
  ]);
};

const setNotificationAndroid12 = async () => {
  const settings = await notifee.getNotificationSettings();

  if (settings.android.alarm === AndroidNotificationSetting.ENABLED) {
    return true;
  } else {
    await notifee.openAlarmPermissionSettings();
    return false;
  }
};

const createTriggerNotification = async ({
  title,
  body,
  subTitle,
  dateTime,
  repeat,
  categoryId,
}: ITriggerNotification) => {
  const now = new Date(Date.now()); // 2023/10/20 오후 02:07
  let newDate = new Date(dateTime); // 2023/10/20 오전 09:00

  console.log(now.toLocaleString());
  console.log(newDate.toLocaleString());

  if (now.getTime() > newDate.getTime()) {
    newDate = moment(dateTime).add(1, 'd').toDate();
    console.log('다음 날에 알림 설정!', newDate.toLocaleString());
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Create a trigger notification
  const notificationId = await notifee.createTriggerNotification(
    {
      title: title,
      subtitle: subTitle,
      body: body,
      android: {
        channelId: channelId,
      },
      ios: {
        categoryId: categoryId,
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: newDate.getTime(),
      repeatFrequency: repeat,
      alarmManager: {
        allowWhileIdle: true,
      },
    },
  );

  await getTriggerNotificationIds();
  return notificationId;
};

const updateTriggerNotification = async (
  notificationId: string,
  triggerNotification: ITriggerNotification,
) => {
  await notifee.cancelNotification(notificationId);
  return await createTriggerNotification(triggerNotification);
};

const getTriggerNotificationIds = async () => {
  const notificationIds = await notifee.getTriggerNotificationIds();
  console.log('notificationIds:', notificationIds);

  return notificationIds;
};

const cancelNotification = async (notificationId: string) => {
  console.log('notificationId:', notificationId);

  await notifee.cancelNotification(notificationId);
  await getTriggerNotificationIds();
};

const cancelAllNotification = async () => {
  await notifee.cancelAllNotifications();
};

export {
  getTriggerNotificationIds,
  requestNotificationPermission,
  updateTriggerNotification,
  setNotificationAndroid12,
  createTriggerNotification,
  cancelNotification,
  setNotificationCategories,
  cancelAllNotification,
};
